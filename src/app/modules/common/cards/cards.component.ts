import { Component, OnInit, Input } from '@angular/core';
import { CardsModel } from '../../../_models';
import { CommonLibService } from 'src/app/_services';

@Component({
  selector: 'ym-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() private cardsJson: [];

  public cards: CardsModel[];
  public cardsChunk: any[];

  constructor(private libServ: CommonLibService) {}

  ngOnInit() {
    this.cards = this.cardsJson.map((card: CardsModel) =>
      new CardsModel().deserialize(card)
    );
    if (this.cards.length < 4) {
      this.cardsChunk = [this.cards];
    } else {
      this.cardsChunk = this.libServ.chunk(
        this.cards,
        parseInt((this.cards.length / 2).toFixed(), 10)
      );
    }
  }
}
