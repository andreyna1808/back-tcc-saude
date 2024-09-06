import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Text,
  VStack,
  Input,
  useToast,
  HStack,
  Flex,
  IconButton,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { useAppContext } from "@/context/AppContext";
import { DynamicForm } from "@/components/dynamicForm";
import { useAuth } from "@/context/AuthContext";
import { decodeToken } from "@/utils/decodeToken";
import { getInfoUser } from "@/services/request/get/getInfoUser";
import { putProfileImg } from "@/services/request/put/putProfileImg";
import { showToast } from "@/components/toast";
import { LikeCommentRemove } from "@/components/likeCommentRemove";
import { MdModeEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { putUserData } from "@/services/request/put/putUserData";
import { Loading } from "@/components/loading";
import useAuthRedirect from "@/hooks/Auth/useAuthRedirect";

const Profile = () => {
  useAuthRedirect();
  const router = useRouter();
  const toast = useToast();
  const { token, typeUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const { dataUser, setDataUser, setIsEditing, isEditing } = useAppContext();
  const fileInputRef = useRef<any>(null);
  const [updateData, setUpdateData] = useState(false);

  const fields =
    typeUser === "doctors"
      ? ["name", "crm", "email", "specialty", "password"]
      : ["name", "nickname", "email", "password"];

  console.log("selected: ", { typeUser, dataUser });

  const onImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (
      !file ||
      !["image/png", "image/jpg", "image/jpeg"].includes(file.type)
    ) {
      return showToast(toast, {
        type: "error",
        title: "Erro",
        description: "Selecione um arquivo PNG, JPG ou JPEG",
      });
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true)
    await putProfileImg(typeUser!, dataUser.id, formData, token!, toast);
    setUpdateData((prev) => !prev);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const onUpdateUserData = async (data: any) => {
    setLoading(true)
    await putUserData(typeUser!, dataUser.id, data, toast, token!);
    setUpdateData((prev) => !prev);
  };

  const infoUser = async (selected: string, id: string, token: string) => {
    const userResp = await getInfoUser(selected, id, token);
    setDataUser(userResp);
    setLoading(false)
  };

  useEffect(() => {
    const tokenData = token && decodeToken(token);

    if (!!tokenData && typeUser) {
      infoUser(typeUser!, tokenData.id, token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, typeUser, updateData]);

  const defaultValues = fields.reduce((acc, field) => {
    if (dataUser && field in dataUser) {
      acc[field] = dataUser[field];
    }
    return acc;
  }, {} as Record<string, any>);

  if (!token || !typeUser || loading) {
    return <Loading />;
  }

  return (
    <main>
      <Flex>
        <IconButton
          onClick={() => router.push("/feed")}
          aria-label="Previous"
          icon={<FaArrowLeft />}
          h="30px"
          w="50px"
          m={4}
        />
      </Flex>
      <HStack p={4} w="100%" h="40vh">
        <VStack w="100%" h="30vh" alignItems="flex-end" pr={4}>
          <Avatar
            boxSize="230px"
            mb={2}
            src={
              dataUser?.profileImageUrl &&
              `/api/${dataUser?.profileImageUrl.split("/uploads/")[1]}?${new Date().getTime()}`
            }
          />

          <Center w="250px">
            <LikeCommentRemove
              onClick={() =>
                fileInputRef?.current && fileInputRef.current.click()
              }
              IconType={MdModeEdit}
              textValue={"Alterar Imagem"}
              sizeIcon={20}
            />
            <Input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpg, image/jpeg"
              style={{ display: "none" }}
              onChange={onImageUpload}
            />
          </Center>
        </VStack>

        <VStack
          alignItems="flex-start"
          w="100%"
          h="30vh"
          pl={4}
        >
          <Text fontSize="xl" fontWeight="bold">
            {dataUser.name}
          </Text>
          <Spacer />
          {typeUser === "doctors" ? (
            <>
              <Text>CRM: {dataUser.crm}</Text>
              <Spacer />
              <Text>Email: {dataUser.email}</Text>
              <Spacer />
              <Text>Especialidade: {dataUser.specialty}</Text>
            </>
          ) : (
            <>
              <Text>Nickname: {dataUser.nickname}</Text>
              <Spacer />
              <Text>Email: {dataUser.email}</Text>
            </>
          )}
          <Spacer />
          <LikeCommentRemove
            onClick={toggleEditMode}
            IconType={MdModeEdit}
            textValue={"Editar Dados"}
            sizeIcon={20}
          />
        </VStack>
      </HStack>
      <Center h="45vh" w="100%">
        <Center w="700px">
          {isEditing && (
            <DynamicForm
              fields={fields}
              typeConfirm="Atualizar"
              typeChange="Cancelar"
              onSubmit={(data) => onUpdateUserData(data)}
              onChangeEvent={toggleEditMode}
              defaultValues={defaultValues}
            />
          )}
        </Center>
      </Center>
    </main>
  );
};

export default Profile;
