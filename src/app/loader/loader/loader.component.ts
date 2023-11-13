import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LoaderService} from "../services/loader.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  isLoading$: BehaviorSubject<boolean> = this.loaderService.isLoading()

  constructor(private loaderService: LoaderService) {}
}
