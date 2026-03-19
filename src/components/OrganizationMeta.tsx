interface OrganizationMetaProps {
    ouCode?: string;
    nomenclature: string;
}

export default function OrganizationMeta({ ouCode, nomenclature }: OrganizationMetaProps) {
    return (
        <div className="flex flex-col items-center gap-1.5 mt-2 mb-8 animate-fade-in-up animation-delay-300">
            <p className="text-base md:text-lg text-muted-foreground font-medium tracking-wide">
                {nomenclature}
            </p>
            {ouCode && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                    <span className="text-muted-foreground font-normal">OU Code:</span>
                    {ouCode}
                </span>
            )}
        </div>
    );
}
