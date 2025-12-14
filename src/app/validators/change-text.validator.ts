import { AbstractControl } from "@angular/forms";

export function ChangeTextValidator (originalText: ()=>string) {
    return (control: AbstractControl) => {
        return control.value === originalText()
        ? { noChanges: true}
        : null
    }
}