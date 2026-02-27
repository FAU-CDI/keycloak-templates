
export const realm = {
    name: "cdi",
    displayName: "CDI SSO",
    displayNameHtml: "CDI SSO",
    internationalizationEnabled: true,
    registrationAllowed: false,
    resetPasswordAllowed: false,
}
export const social = {
    displayInfo: true,
    providers: [
        {
            loginUrl: "oidc",
            alias: "oidc",
            providerId: "oidc",
            displayName: "DFN-AAI",
            iconClasses: "fa fa-cube"
        }
    ]
};
export const localeDE = {
    currentLanguageTag: "de",
}
export const localeEN = {
    currentLanguageTag: "en",
}

export function messagesPerField(names: string[], message: string) {
    return {
        existsError: (fieldName: string, ...otherFieldNames: string[]) => {
            const fieldNames = [fieldName, ...otherFieldNames];
            for (const name of names) {
                if (fieldNames.includes(name)) {
                    return true;
                }
            }
            return false;
        },
        get: (fieldName: string) => {
            if (names.includes(fieldName)) {
                return message;
            }
            return "";
        }
    }
}