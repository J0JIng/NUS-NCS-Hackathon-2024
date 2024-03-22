import DropdownComponent from './DropdownComponent';

export default class LocationDropdownComponent extends DropdownComponent {
    state = {
        selectedcat: '',
        category: [
            {
                itemName: 'star vista',
            },
            {
                itemName: 'national stadium',
            },
            {
                itemName: 'nus ho bee auditorium',
            },
            {
                itemName: 'nus ucc theatre',
            },
            {
                itemName: 'vitoria concert hall',
            },
        ],
    };
}