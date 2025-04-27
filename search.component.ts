import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html'
})
export class SearchComponent {
    @Input() placeholder = 'Search...';
    @Output() search = new EventEmitter<string>();

    searchValue = '';

    onSearch() {
        this.search.emit(this.searchValue);
    }
}
