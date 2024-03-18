import DropdownComponent from './DropdownComponent';

export default class HomeDropdownComponent extends DropdownComponent {
    state = {
        selectedcat: '',
        category: [
            {
                itemName: 'Northeast',
            },
            {
                itemName: 'North',
            },
            {
                itemName: 'Central',
            },
            {
                itemName: 'West',
            },
            {
                itemName: 'East',
            },
        ],
    };
}