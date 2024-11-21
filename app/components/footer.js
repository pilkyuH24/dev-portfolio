// app/components/Footer.js
"use client";

export default function Footer() {
  return (
    <footer>
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-sm text-center sm:text-left dark:text-white">
            © {new Date().getFullYear()} — @Pilkyu Han
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            
          </span>
        </div>
    </footer>
  );
}
