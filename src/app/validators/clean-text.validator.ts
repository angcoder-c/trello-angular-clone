import { AbstractControl } from "@angular/forms";

export function CleanTextValidator () {
    return (control: AbstractControl) => {
        console.log(JSON.stringify(control.value))
        const otherChars = control.value?.split('')?.filter((value: string) => value !== '\n')?.length
        console.log(control.value?.split('')?.filter((value: string) => value !== '\n'))
        console.log(otherChars)
        return otherChars > 0
        ? null
        : { clean: true }
    }
}