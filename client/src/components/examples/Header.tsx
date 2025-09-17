import Header from '../Header';

export default function HeaderExample() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Header Component Example</h2>
          <p className="text-muted-foreground">
            This shows the sticky header with Azure branding and theme toggle
          </p>
        </div>
      </div>
    </div>
  );
}