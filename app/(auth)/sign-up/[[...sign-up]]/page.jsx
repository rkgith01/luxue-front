import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGNsb3RoaW5nJTIwc3RvcmV8ZW58MHwxfDB8fHwy"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>

              <img
                src="/logo.jpeg"
                alt="brand-logo"
                className="mb-4 h-[2000px] sm:h-[200px] rounded"
              />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to LuxueLease
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Discover a world where fashion meets flexibility with LuxueLease.
              We bring you an exclusive Rent-a-Style experience, allowing you to
              indulge in the latest trends without the hefty price tag. Elevate
              your wardrobe for special occasions or embrace daily luxury, all
              at your fingertips.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <SignUp />
          </div>
        </main>
      </div>
    </section>
  );
}
