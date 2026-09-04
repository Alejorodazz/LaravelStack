type WelcomeProps = {
    appName: string;
    laravelVersion: string;
    phpVersion: string;
};

type Highlight = {
    title: string;
    description: string;
};

export default function Welcome({
    appName,
    laravelVersion,
    phpVersion,
}: WelcomeProps) {
    const highlights: Highlight[] = [
        {
            title: 'Laravel como backend',
            description:
                'La ruta principal ya responde con Inertia y entrega props listas para React.',
        },
        {
            title: 'React como UI',
            description:
                'La pantalla de bienvenida vive en un componente React y puede crecer a layout, paginas y navegación.',
        },
        {
            title: 'Base lista para escalar',
            description:
                'Queda configurado el middleware de Inertia, Vite con React y una estructura limpia de Pages.',
        },
    ];

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fed7aa,_transparent_35%),linear-gradient(135deg,_#fff7ed,_#fffbeb_45%,_#ffffff)] text-stone-900">
            <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 lg:px-10">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-medium text-orange-900 shadow-sm backdrop-blur">
                            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                            Inertia.js conectado con React
                        </div>

                        <div className="space-y-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
                                {appName}
                            </p>
                            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl">
                                Welcome renderizado desde Laravel hacia React.
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-stone-700">
                                Sí has llegado a este punto, significa que has levantado bien tu Infraestructura, y has migrado bien 
                                tu proyecto de Laravel hacia React con Inertia. Esto significa que
                                Has hecho tu primer deploy a instancias EC2 y has configurado tu base de datos en RDS.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-stone-700">
                            <div className="rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 shadow-sm">
                                <span className="font-semibold text-stone-950">Laravel</span>{' '}
                                {laravelVersion}
                            </div>
                            <div className="rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 shadow-sm">
                                <span className="font-semibold text-stone-950">PHP</span> {phpVersion}
                            </div>
                            <div className="rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 shadow-sm">
                                <span className="font-semibold text-stone-950">Frontend</span> React +
                                Inertia
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_30px_80px_-35px_rgba(120,53,15,0.45)] backdrop-blur">
                        <div className="grid gap-4">
                            {highlights.map((item) => (
                                <article
                                    key={item.title}
                                    className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5"
                                >
                                    <h2 className="text-lg font-semibold text-stone-950">
                                        {item.title}
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-stone-700">
                                        {item.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
