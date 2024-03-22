import DropdownComponent from './DropdownComponent';

export default class TimeDropdownComponent extends DropdownComponent {
    state = {
        selectedcat: '',
        category: [
            {
                itemName: '9am-12pm',
            },
            {
                itemName: '12pm-3pm',
            },
            {
                itemName: '3pm-6pm',
            },
            {
                itemName: '6pm-9pm',
            },
            {
                itemName: '9pm-12am',
            },
        ],
    };
}