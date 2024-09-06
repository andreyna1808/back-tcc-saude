import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  selected: "doctors" | "users";
  setSelected: (type: "doctors" | "users") => void;
  dataUser: any;
  setDataUser: (data: any) => void;
  setIsEditing: (value: boolean) => void;
  isEditing: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selected, setSelected] = useState<"doctors" | "users">("doctors");
  const [dataUser, setDataUser] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AppContext.Provider
      value={{
        selected,
        setSelected,
        dataUser,
        setDataUser,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
