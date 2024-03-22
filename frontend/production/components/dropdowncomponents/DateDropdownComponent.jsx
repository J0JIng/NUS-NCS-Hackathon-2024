import DropdownComponent from './DropdownComponent';

export default class DateDropdownComponent extends DropdownComponent {
    state = {
        selectedcat: '',
        category: [
            {
                itemName: '18 March',
            },
            {
                itemName: '19 March',
            },
            {
                itemName: '20 March',
            },
            {
                itemName: '21 March',
            },
            {
                itemName: '22 March',
            },
        ],
    };
}