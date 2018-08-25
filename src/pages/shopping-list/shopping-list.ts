import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';

// Custom Models
import { Ingredient } from '../../models/ingredient';

// Custom Services
import { ShoppingListService } from '../../services/shopping-list';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage implements OnInit {

  listItems: Ingredient[];

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.ingredientAmount);
    this.loadItems();
    form.reset();
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }

}
