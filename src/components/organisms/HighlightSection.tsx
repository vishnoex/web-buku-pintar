import React from 'react';
import { cn } from '@/utils/utils';
import { Brain, BrainCircuit, Salad } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import Link from 'next/link';

interface HighlightSectionProps {
  className?: string;
}

const HighlightSection: React.FC<HighlightSectionProps> = ({ className }) => {
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className="container px-4 md:px-6">
        <div className="py-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-in">
            BukuPintar bantu kamu belajar hal baru setiap hari dengan cara yang mudah & menyenangkan.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          {/* Left: Features */}
          <div className="flex flex-col justify-center space-y-4">
            {/* Key: 1 */}
            <div className="flex items-start gap-4">
              <span className="inline-flex items-center justify-center rounded-lg bg-brand-light p-3">
                <Brain className="w-6 h-6" />
              </span>
              <div>
                <div className="font-bold text-lg">Tambah wawasanmu setiap hari</div>
                <div className="text-muted-foreground">
                  Cukup baca atau dengar ringkasan buku hanya 10 menit bareng BukuPintar.
                </div>
              </div>
            </div>
            {/* Key: 2 */}
            <div className="flex items-start gap-4">
              <span className="inline-flex items-center justify-center rounded-lg bg-brand-light p-3">
                <BrainCircuit className="w-6 h-6" />
              </span>
              <div>
                <div className="font-bold text-lg">Intinya aja, yang penting ngerti</div>
                <div className="text-muted-foreground">
                  Kamu gak perlu baca ratusan halaman buku, cukup ringkasannya dan kamu langsung dapet ilmunya.
                </div>
              </div>
            </div>
            {/* Key: 3 */}
            <div className="flex items-start gap-4">
              <span className="inline-flex items-center justify-center rounded-lg bg-brand-light p-3">
                <Salad className="w-6 h-6" />
              </span>
              <div>
                <div className="font-bold text-lg">Bukan sekedar ringkasan, ini nutrisi untuk pikiranmu</div>
                <div className="text-muted-foreground">
                  BukuPintar menyajikan ringkasan buku yang relevan, praktis, dan bikin kamu berkembang setiap hari.
                </div>
              </div>
            </div>
          </div>
          {/* Right: Highlighted Box */}
          <div className="flex items-center justify-center">
            <div className="rounded-xl w-full max-w-md">
              <video
                controls
                className="rounded-lg w-full h-64 bg-black"
                poster="https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600"
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="py-8 flex items-center justify-center" style={{animationDelay: '0.2s'}}>
            <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
              <Link href="/books">Explore Books</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;
