import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ActionSheetController, AlertController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

// Custom Services
import { UtilityService } from '../../services/utility';
import { RecipesService } from '../../services/recipes';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode: string = 'New';
  difficultySelectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private utilService: UtilityService,
    private recipeService: RecipesService
  ) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      difficulty: new FormControl('Medium', Validators.required),
      ingredients: new FormArray([])
    });
  }

  onRecipeFormSubmit() {
    console.log('this.recipeForm.value: ', this.recipeForm.value);
    const formValue = this.recipeForm.value;
    let ingredients = [];
    if (formValue.ingredients.length > 0) {
      ingredients = formValue.ingredients.map(name => {
        return {
          name: name,
          amount: 1
        };
      });
    }
    this.recipeService.addRecipe(formValue.title, formValue.description, formValue.difficulty, ingredients);
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              this.utilService.presentToast('All ingredients are removed from list!', 2000);
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() === '' || data.name === null) {
              this.utilService.presentToast('Please enter a valid value!', 2000);
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            this.utilService.presentToast('Ingredient added to list!', 2000);
          }
        }
      ]
    });
  }

}
