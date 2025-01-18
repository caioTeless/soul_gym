export default class Dropdown {

    constructor() {
        this.dropdown = document.querySelectorAll('[data-dropdown]');
        this.handleActiveDropdown = this.handleActiveDropdown.bind(this);
    }

    handleDropdown() {
        this.dropdown.forEach((item) => {
            item.addEventListener('click', this.handleActiveDropdown);
        })
    }

    handleActiveDropdown(event) {
        event.preventDefault();
        const element = event.currentTarget;
        element.classList.add('active');
        this.handleOutsideClick(element, ['click'], () => {
            element.classList.remove('active')
        })
    }

    handleOutsideClick(element, events, callback) {
        const html = document.documentElement;
        const outside = 'data-outside'
        function handleOutsideClick(event) {
            if (!element.contains(event.target)) {
                element.removeAttribute(outside);
                events.forEach((item) => {
                    html.removeEventListener(item, handleOutsideClick)
                })
                callback()
            }
        }

        if (!element.hasAttribute(outside)) {
            events.forEach((evt) => {
                setTimeout(() => html.addEventListener(evt, handleOutsideClick))
            })
            element.setAttribute(outside, '')
        }
    }

    init() {
        this.handleDropdown();
    }

}

