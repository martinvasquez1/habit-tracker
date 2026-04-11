import { useState } from "react";
import { useTranslation } from "react-i18next"
import { jwtDecode } from "jwt-decode";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Container } from "@/components/ui/container";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"

import DeleteUser from "@/features/users/components/delete-user";
import { Button } from "@/components/ui/button";

export default function Settings() {
    const { t, i18n } = useTranslation()

    const jwt = localStorage.getItem("jwt");
    if (!jwt) return "Error";

    const decoded = jwtDecode(jwt) as { id: string };
    const userId = decoded.id;

    const [language, setLanguage] = useState<string>(
        () => localStorage.getItem("language") || i18n.language || "en"
    );

    function handleChange(lang: string) {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const items = [
        {
            sectionTitle: t('settings.preferences.title'),
            items: [
                {
                    title: t('settings.preferences.language.title'), 
                    description: t('settings.preferences.language.description'),
                    component:
                        <Select
                            value={language}
                            onValueChange={handleChange}
                        >
                            <SelectTrigger id="language-select">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">{t('settings.preferences.language.options.en')}</SelectItem>
                                <SelectItem value="es">{t('settings.preferences.language.options.es')}</SelectItem>
                            </SelectContent>
                        </Select>,
                },
            ]
        },
        {
            sectionTitle: t('settings.account.title'),
            items: [
                {
                    title: t('settings.account.delete.title'),
                    description: t('settings.account.delete.description'),
                    component: <DeleteUser id={+userId} />
                },
                {
                    title: t('settings.account.export.title'),
                    description: t('settings.account.export.description'),
                    component:<Button variant="outline" size="sm" disabled>{t('settings.account.export.button')}</Button>,
                }
            ]
        }
    ];


    return (
        <div>
            <div className="flex justify-between items-baseline">
                <h1 className="font-bold text-2xl mb-6">{t('settings.title')}</h1>
            </div>

            {items.map(item => {
                return (
                    <Container className="mb-4">
                        <h2 className="font-bold text-xl mb-2">{item.sectionTitle}</h2>
                        {item.items.map(item => {
                            return (
                                <Item variant="default" className="px-0">
                                    <ItemContent>
                                        <ItemTitle>{item.title}</ItemTitle>
                                        <ItemDescription>{item.description}</ItemDescription>
                                    </ItemContent>
                                    <ItemActions>{item.component}</ItemActions>
                                </Item>
                            )
                        })}
                    </Container>
                )
            })}
        </div>
    )
}