import { useState } from "react";
import { useTranslation } from "react-i18next"
import { jwtDecode } from "jwt-decode";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/ui/container";
import DeleteUser from "@/features/users/components/delete-user";

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

    return (
        <div>
            <div className="flex justify-between items-baseline">
                <h1 className="font-bold text-2xl mb-6">{t('settings.title')}</h1>
            </div>

            <Container>
                <h2 className="font-bold text-2xl mb-2">{t('settings.preferences')}</h2>
                <div className="flex justify-between gap-4">
                    <Label htmlFor="language-select">{t('settings.language')}</Label>
                    <Select
                        value={language}
                        onValueChange={handleChange}
                    >
                        <SelectTrigger id="language-select">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">{t('settings.language_options.en')}</SelectItem>
                            <SelectItem value="es">{t('settings.language_options.es')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Container>

            <Container className="mt-4">
                <h2 className="font-bold text-2xl mb-2">{t('settings.account')}</h2>
                <div className="flex justify-between gap-4">
                    <Label>{t('settings.delete_account')}</Label>
                    <DeleteUser id={+userId} />
                </div>
            </Container>
        </div>
    )
}