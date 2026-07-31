import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function About() {
  return (
    <div className="w-full pt-24 pb-16 min-h-screen">
      <Container>
        <SectionHeader 
          title="About Us" 
          description="Al-Amin Export is a vertically integrated ecosystem where advanced engineering meets the delicate touch of couture." 
          align="center" 
        />
        <div className="mt-12 text-center text-muted-foreground">
          <p>This page is under construction as we continue matching our pixel-perfect designs.</p>
        </div>
      </Container>
    </div>
  );
}
