import { Button } from '@/components/ui/Button';
import { LegalPage } from '@/components/ui/LegalPage';

export default function NotFound() {
  return (
    <LegalPage title="Page not found">
      <p>The page you are looking for does not exist or has moved.</p>
      <Button href="/">Back to Home</Button>
    </LegalPage>
  );
}
