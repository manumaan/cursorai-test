import { Calculator } from '@/components/calculator/calculator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Scientific Calculator</h1>
          <Link href="/help">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <span>Help</span>
              <HelpCircle className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Calculator />
      </div>
    </main>
  );
}
