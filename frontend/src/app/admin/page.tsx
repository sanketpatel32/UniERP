export default function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-4xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage system-wide settings, users, and configuration.
        </p>
      </div>
    </main>
  );
}
