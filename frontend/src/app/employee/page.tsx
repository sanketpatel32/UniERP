export default function EmployeePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-4xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Employee Portal
        </h1>
        <p className="text-muted-foreground text-lg">
          Access your profile, payslips, leave requests, and more.
        </p>
      </div>
    </main>
  );
}
