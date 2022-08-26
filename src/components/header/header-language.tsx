import i18next from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import language from '@/config/language';
import Listbox from '@/components/ui/list-box';

const HeaderLanguage = () => {
  const [selectedLang, setSelectedLang] = useState<any>(language[0]);

  const onChangeLanguage = useCallback((e: any) => {
    const { value } = e;
    i18next.changeLanguage(value);
    setSelectedLang(e);
  }, []);

  return (
    <div className="relative order-last flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-8">
      <Listbox
        className="sm:w-44"
        options={language}
        selectedOption={selectedLang}
        onChange={onChangeLanguage}
      />
    </div>
  );
};

export default HeaderLanguage;
