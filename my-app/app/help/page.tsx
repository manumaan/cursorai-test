import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Calculator Help</h1>
          <Link href="/">
            <Button variant="outline">Back to Calculator</Button>
          </Link>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Welcome to Your Super Calculator!</CardTitle>
              <CardDescription>
                This calculator can do way more than just add and subtract. Let's learn how to use it!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This calculator is like having a math wizard in your pocket. It can help you with homework, 
                science projects, or just for fun math explorations!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Basic Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc pl-5">
                <li><strong>Numbers (0-9)</strong>: Press these to enter numbers</li>
                <li><strong>+ - × ÷</strong>: For adding, subtracting, multiplying, and dividing</li>
                <li><strong>=</strong>: Shows your answer</li>
                <li><strong>C</strong>: Clears everything and starts fresh</li>
                <li><strong>CE</strong>: Clears only what you're typing now</li>
                <li><strong>DEL</strong>: Erases the last digit you typed</li>
                <li><strong>.</strong>: Adds a decimal point for numbers like 3.14</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Cool Science Stuff</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                These buttons help with more advanced math you'll see in science class:
              </p>
              <ul className="space-y-3 list-disc pl-5">
                <li><strong>sin, cos, tan</strong>: Special angle functions used in geometry and physics</li>
                <li><strong>log, ln</strong>: Logarithms - useful for working with very big or small numbers</li>
                <li><strong>√ (sqrt)</strong>: Square root - finds what number multiplied by itself equals your number</li>
                <li><strong>x²</strong>: Squares a number (multiplies it by itself)</li>
                <li><strong>x³</strong>: Cubes a number (multiplies it by itself twice)</li>
                <li><strong>π (pi)</strong>: The special number 3.14159... used for circles</li>
                <li><strong>e</strong>: Another special number (2.71828...) used in growth calculations</li>
              </ul>
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">Tip: Toggle between DEG and RAD for angle measurements!</p>
                <p className="text-xs mt-1">
                  • DEG: Measures angles in degrees (like 90° for a right angle)<br />
                  • RAD: Measures angles in radians (scientists often use this)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Memory Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                These buttons help you remember numbers while you're working:
              </p>
              <ul className="space-y-3 list-disc pl-5">
                <li><strong>MS</strong>: Memory Store - saves the number on the display</li>
                <li><strong>MR</strong>: Memory Recall - brings back the saved number</li>
                <li><strong>M+</strong>: Memory Add - adds the display number to what's in memory</li>
                <li><strong>M-</strong>: Memory Subtract - subtracts the display number from memory</li>
                <li><strong>MC</strong>: Memory Clear - erases what's in memory</li>
              </ul>
              <div className="mt-4 p-3 bg-primary/10 rounded-md">
                <p className="text-sm">
                  <strong>Example:</strong> To add several numbers together, press MS after the first number, 
                  then use M+ after each additional number. When done, press MR to see the total!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">History Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                On the right side (or below on phones), you'll see your calculation history.
              </p>
              <ul className="space-y-3 list-disc pl-5">
                <li>Every calculation you do is saved here</li>
                <li>Click on any previous result to use it again</li>
                <li>Great for checking your work or continuing from a previous answer</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Keyboard Shortcuts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                You can also use your computer keyboard to type:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Number keys for digits</li>
                <li>+, -, *, / for operations</li>
                <li>Enter key works like =</li>
                <li>Backspace to delete</li>
                <li>Escape (Esc) to clear all</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Fun Examples to Try</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <p className="font-medium">Find the area of a circle with radius 5:</p>
                  <p className="mt-1 text-muted-foreground">Press: 5 → x² → × → π → =</p>
                  <p className="mt-1">You should get about 78.54 (which is π × 5²)</p>
                </div>
                
                <div className="p-3 border rounded-md">
                  <p className="font-medium">Calculate how much 15% tip would be on a $24 meal:</p>
                  <p className="mt-1 text-muted-foreground">Press: 24 → × → 0.15 → =</p>
                  <p className="mt-1">You should get $3.60</p>
                </div>
                
                <div className="p-3 border rounded-md">
                  <p className="font-medium">Find the hypotenuse of a right triangle with sides 3 and 4:</p>
                  <p className="mt-1 text-muted-foreground">Press: 3 → x² → + → 4 → x² → = → sqrt</p>
                  <p className="mt-1">You should get 5 (using the Pythagorean theorem)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Link href="/">
              <Button size="lg" className="animate-pulse">
                Try the Calculator Now!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 