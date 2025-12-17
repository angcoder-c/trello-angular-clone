import { AbstractControl } from "@angular/forms";

export function CleanTextValidator () {
    return (control: AbstractControl) => {
        const otherChars = control.value?.split('')?.filter((value: string) => value !== '\n')?.length
        return otherChars > 0
        ? null
        : { clean: true }
    }
}