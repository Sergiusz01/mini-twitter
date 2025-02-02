const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Polityka Prywatności</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Pliki Cookies</h2>
          <p className="text-gray-200 mb-4">
            Nasza strona wykorzystuje pliki cookies (ciasteczka) w celu świadczenia usług na najwyższym poziomie. 
            Korzystanie z witryny bez zmiany ustawień dotyczących cookies oznacza, że będą one zamieszczane w Państwa urządzeniu końcowym.
          </p>
          <p className="text-gray-200">
            Możecie Państwo dokonać w każdym czasie zmiany ustawień dotyczących cookies w ustawieniach swojej przeglądarki.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Jakie pliki cookies wykorzystujemy?</h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2">
            <li>Niezbędne pliki cookies - umożliwiające korzystanie z usług dostępnych w ramach serwisu</li>
            <li>Pliki cookies służące do zapewnienia bezpieczeństwa</li>
            <li>Pliki cookies służące do zbierania danych o sposobie korzystania z serwisu</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Jak długo przechowujemy informacje?</h2>
          <p className="text-gray-200">
            Pliki cookies przechowujemy przez okres niezbędny do realizacji wyżej wymienionych celów. 
            W większości przypadków jest to okres 12 miesięcy od ostatniej aktywności.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Zmiany w polityce prywatności</h2>
          <p className="text-gray-200">
            Zastrzegamy sobie prawo do zmiany niniejszej polityki prywatności poprzez opublikowanie nowej wersji na tej stronie.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 