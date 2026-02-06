import { Button, Card } from "@/components";

/**
 * Home Page
 * 
 * Demonstrates the layout architecture with reusable components.
 * Shows Header, Sidebar (from LayoutWrapper) and uses Button/Card components.
 */
export default function Home() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to RefundRoute
        </h1>
        <p className="text-lg text-gray-600">
          Demonstrating reusable component architecture with Header, Sidebar, and UI elements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Layout Components" variant="highlighted">
          <div className="space-y-3">
            <p className="text-gray-700">
              This page uses a modular layout architecture:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Header:</strong> Global navigation bar (top)</li>
              <li><strong>Sidebar:</strong> Contextual navigation (left)</li>
              <li><strong>LayoutWrapper:</strong> Combines both for all pages</li>
            </ul>
            <div className="pt-3">
              <Button label="View Dashboard" variant="primary" />
            </div>
          </div>
        </Card>

        <Card title="UI Components" variant="bordered">
          <div className="space-y-3">
            <p className="text-gray-700">
              Reusable UI elements with props contracts:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Button:</strong> 4 variants (primary, secondary, danger, success)</li>
              <li><strong>Card:</strong> 3 variants with optional header/footer</li>
            </ul>
            <div className="flex gap-2 pt-3">
              <Button label="Primary" variant="primary" />
              <Button label="Secondary" variant="secondary" />
            </div>
          </div>
        </Card>

        <Card title="Benefits" footer={<p className="text-xs text-gray-500">Scroll sidebar to see all sections</p>}>
          <ul className="space-y-2 text-gray-700">
            <li>✅ <strong>Reusability:</strong> Components used across all pages</li>
            <li>✅ <strong>Maintainability:</strong> Update once, applies everywhere</li>
            <li>✅ <strong>Scalability:</strong> Easy to add new components</li>
            <li>✅ <strong>Accessibility:</strong> ARIA labels and semantic HTML</li>
          </ul>
        </Card>

        <Card title="Try It Out" variant="default">
          <p className="text-gray-700 mb-4">
            Navigate using the Header (top) or Sidebar (left) to see consistent layout across pages.
          </p>
          <div className="space-y-2">
            <Button label="Go to Dashboard" variant="success" />
            <Button label="View Users" variant="secondary" />
            <Button label="Disabled Button" variant="danger" disabled />
          </div>
        </Card>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">💡 Component Architecture</h2>
        <p className="text-sm text-yellow-700">
          All pages share the same <code className="bg-yellow-100 px-1 rounded">LayoutWrapper</code> component, 
          which includes <code className="bg-yellow-100 px-1 rounded">Header</code> and{" "}
          <code className="bg-yellow-100 px-1 rounded">Sidebar</code>. This ensures visual consistency 
          and reduces code duplication. UI components like <code className="bg-yellow-100 px-1 rounded">Button</code> and{" "}
          <code className="bg-yellow-100 px-1 rounded">Card</code> accept props for customization while 
          maintaining design standards.
        </p>
      </div>
    </div>
  );
}
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
