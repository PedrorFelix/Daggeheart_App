const domains = [
  { Icon: "/Svg_Arcana.svg", name: "Arcana", slug: "arcana", baseColor: "#9333ea" },
  { Icon: "/Svg_Blade.svg", name: "Blade", slug: "blade", baseColor: "#dc2626" },
  { Icon: "/Svg_Bone.svg", name: "Bone", slug: "bone", baseColor: "#6b7280" },
  { Icon: "/Svg_Codex.svg", name: "Codex", slug: "codex", baseColor: "#2563eb" },
  { Icon: "/Svg_Grace.svg", name: "Grace", slug: "grace", baseColor: "#ec4899" },
  { Icon: "/Svg_Midnight.svg", name: "Midnight", slug: "midnight", baseColor: "#475569" },
  { Icon: "/Svg_Sage.svg", name: "Sage", slug: "sage", baseColor: "#059669" },
  { Icon: "/Svg_Splendor.svg", name: "Splendor", slug: "splendor", baseColor: "#d97706" },
  { Icon: "/Svg_Valor.svg", name: "Valor", slug: "valor", baseColor: "#ea580c" },
];


export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8 lg:p-20">
      <main className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-left mb-8 sm:mb-12 lg:mb-16">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6">
            Daggerheart Quick Ref
          </h1>
          <div className="max-w-2xl">
            <ol className="font-mono text-sm sm:text-base lg:text-lg space-y-2">
              <li className="tracking-[-0.01em]">
                Get started by clicking the domain you wish
              </li>
              <li className="tracking-[-0.01em]">
                Check the cards you want.
              </li>
            </ol>
          </div>
        </div>
        {/*Domain Grid*/}
        <div>
          
        </div>
      </main>
    </div>
  );
}