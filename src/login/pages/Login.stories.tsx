import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
    title: "login/login.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

const realm = {
    name: "cdi",
    displayName: "CDI SSO",
    displayNameHtml: "CDI SSO",
    internationalizationEnabled: true,
    registrationAllowed: false,
    resetPasswordAllowed: false,
}
const social = {
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

export const BlankLoginEnglish: Story = {
    render: () => <KcPageStory kcContext={
        {
            realm,
            social,
            locale: {
                currentLanguageTag: "en",
            }
        }
    } />
};

export const BlankLoginGerman: Story = {
    render: () => <KcPageStory kcContext={
        {
            realm,
            social,
            locale: {
                currentLanguageTag: "de",
            }
        }
    } />
};

export const WithWrongPasswordEnglish: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm,
                social,
                locale: {
                    currentLanguageTag: "en",
                },

                login: {
                    username: "johndoe"
                },
                messagesPerField: {
                    // NOTE: The other functions of messagesPerField are derived from get() and
                    // existsError() so they are the only ones that need to mock.
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => {
                        const fieldNames = [fieldName, ...otherFieldNames];
                        return fieldNames.includes("username") || fieldNames.includes("password");
                    },
                    get: (fieldName: string) => {
                        if (fieldName === "username" || fieldName === "password") {
                            return "Invalid username or password.";
                        }
                        return "";
                    }
                }
            }}
        />
    )
};

export const WithWrongPasswordGerman: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm,
                social,
                locale: {
                    currentLanguageTag: "de",
                },
                login: {
                    username: "johndoe"
                },
                messagesPerField: {
                    // NOTE: The other functions of messagesPerField are derived from get() and
                    // existsError() so they are the only ones that need to mock.
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => {
                        const fieldNames = [fieldName, ...otherFieldNames];
                        return fieldNames.includes("username") || fieldNames.includes("password");
                    },
                    get: (fieldName: string) => {
                        if (fieldName === "username" || fieldName === "password") {
                            return "Falscher Nutzername oder Passwort";
                        }
                        return "";
                    }
                }
            }}
        />
    )
};


export const WithErrorMessageEnglish: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm,
                social,
                locale: {
                    currentLanguageTag: "en",
                },
                message: {
                    summary: "Some random error message here - probably login with SSO failed",
                    type: "error"
                },
                
            }}
        />
    )
};

export const WithErrorMessageGerman: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm,
                social,
                locale: {
                    currentLanguageTag: "de",
                },
                message: {
                    summary: "Irgendeine Fehlermeldung hier - wahrscheinlich ging SSO login schief",
                    type: "error"
                },
                
            }}
        />
    )
};