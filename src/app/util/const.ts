import {BodyOutputType, ToasterConfig} from 'angular2-toaster';

export class Const {
    static dtLangFile = {
        fa: 'Persian',
        en: 'English'
    };

    static rtlLangs = ['fa'];

    static defaultLang = 'fa';

    static toasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right',
        newestOnTop: true,
        tapToDismiss: true,
        preventDuplicates: true,
        animation: 'fade',
        bodyOutputType: BodyOutputType.TrustedHtml
    });

    static dynamicFormControlfMetadataKey = 'DynamicFormControl';
    static gridMetadataKey = 'Grid';
    static authMetadataKey = 'Auth';
}
