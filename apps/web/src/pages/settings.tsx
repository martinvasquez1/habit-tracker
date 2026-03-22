import { useState } from "react";
import { useTranslation } from "react-i18next"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/ui/container";

export default function Settings() {
    const { t, i18n } = useTranslation()

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
                <div className="flex justify-between gap-4">
                    <Label htmlFor="language-select">Select Language</Label>
                    <Select
                        value={language}
                        onValueChange={handleChange}
                    >
                        <SelectTrigger id="language-select">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Container>
        </div>
    )
}