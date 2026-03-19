import { Button } from "@/components/ui/button";

export default function ComponentsPage() {
	return (
		<main className="min-h-screen bg-bg-page p-8">
			<div className="max-w-4xl mx-auto space-y-12">
				<div className="border-b border-border-primary pb-8">
					<h1 className="text-text-primary text-3xl font-bold mb-2">
						UI Components
					</h1>
					<p className="text-text-secondary">
						Component showcase with all variants
					</p>
				</div>

				{/* Button Section */}
				<section className="space-y-6">
					<div className="flex items-center gap-2">
						<span className="text-accent-green font-mono text-sm font-bold">
							#
						</span>
						<h2 className="text-text-primary text-xl font-semibold">Button</h2>
					</div>

					{/* Variants */}
					<div className="space-y-4">
						<h3 className="text-text-secondary text-sm font-medium">
							Variants
						</h3>
						<div className="flex flex-wrap items-center gap-4 p-6 border border-border-primary rounded-lg bg-bg-surface">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="destructive">Destructive</Button>
							<Button variant="outline">Outline</Button>
						</div>
					</div>

					{/* Sizes */}
					<div className="space-y-4">
						<h3 className="text-text-secondary text-sm font-medium">Sizes</h3>
						<div className="flex flex-wrap items-center gap-4 p-6 border border-border-primary rounded-lg bg-bg-surface">
							<Button size="sm">Small</Button>
							<Button size="md">Medium</Button>
							<Button size="lg">Large</Button>
						</div>
					</div>

					{/* States */}
					<div className="space-y-4">
						<h3 className="text-text-secondary text-sm font-medium">States</h3>
						<div className="flex flex-wrap items-center gap-4 p-6 border border-border-primary rounded-lg bg-bg-surface">
							<Button loading>Loading</Button>
							<Button disabled>Disabled</Button>
						</div>
					</div>

					{/* All combinations */}
					<div className="space-y-4">
						<h3 className="text-text-secondary text-sm font-medium">
							All Combinations
						</h3>
						<div className="grid grid-cols-3 gap-4 p-6 border border-border-primary rounded-lg bg-bg-surface">
							{(
								[
									"primary",
									"secondary",
									"ghost",
									"destructive",
									"outline",
								] as const
							).map((variant) =>
								(["sm", "md", "lg"] as const).map((size) => (
									<Button
										key={`${variant}-${size}`}
										variant={variant}
										size={size}
									>
										{variant} / {size}
									</Button>
								)),
							)}
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
