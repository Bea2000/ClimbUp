'use client';

export default function Footer() {
  return (
    <footer className="bg-base-300 py-12">
      <div className="container mx-auto px-6">
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ClimbUp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
