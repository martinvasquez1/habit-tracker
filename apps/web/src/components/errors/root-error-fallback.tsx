import { useTranslation } from "react-i18next";

import { FallbackProps } from "react-error-boundary";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const { t } = useTranslation();

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-[350px] p-6 mx-8 text-center gap-3">
                <h1 className="text-2xl font-bold">{t('common.errors.root_fallback.title')}</h1>
                <p className="pb-2">{error.message}</p>
                <Button onClick={resetErrorBoundary}>{t('common.errors.root_fallback.button')}</Button>
            </Card>
        </div>
    );
}
