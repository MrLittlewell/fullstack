import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
import {PositionsService} from '../../shared/services/positions.service'
import {Observable} from 'rxjs'
import {Position} from '../../shared/interfaces'
import {switchMap} from 'rxjs/operators'

@Component({
  selector: 'app-order-position',
  templateUrl: './order-position.component.html',
  styleUrls: ['./order-position.component.css']
})
export class OrderPositionComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute,
              private  positionsService: PositionsService) {
  }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        )
      )
  }

  addToOrder(position: Position) {

  }

}
