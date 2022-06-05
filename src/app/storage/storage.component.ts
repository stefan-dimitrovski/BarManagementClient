import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap} from "rxjs";
import {StorageService} from "../storage.service";

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private storageService: StorageService) {
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                filter((data) => data.has('id')),
                map((data) => +data.get('id')!),
                switchMap((id) =>
                    this.storageService.getStorage(id).pipe(
                        map((storage, id) => ({
                            storage,
                            id,
                        }))
                    )
                )
            )
            .subscribe({
                next: ({storage, id}) => {
                    console.log(storage);
                    console.log(id);
                },
            });
    }
}
