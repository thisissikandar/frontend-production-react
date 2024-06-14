/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Buttons, RTE, Input, Select } from "../index";
import appWriteService from "../../appwrite/appwritconfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Postform = ({ posts }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: posts?.title || "",
        slug: posts?.slug || "",
        content: posts?.content || "",
        status: posts?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const submit = async (data) => {
    if (posts) {
      const file = data.image[0]
        ? await appWriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        await appWriteService.deleteFile(posts.featuredImage);
      }

      const dbPost = await appWriteService.updatePost(posts.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/posts/${dbPost.$id}`);
      } else {
        const file = await appWriteService.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await appWriteService.createPost({
            ...data,
            userId: userData.$id,
          });
          if (dbPost) {
            navigate(`/posts/${dbPost.$id}`);
          }
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      const slug = value.toLowerCase().replace(/ /g, "_");
      setValue("slug", slug);
      return slug;
    }
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransform(value.title, {
            shouldValidate: true,
          })
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);

  return (
    <form onClick={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title: "
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="Content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image: "
          type="file"
          placeholder="Title"
          className="mb-4"
          accept="image/png , image/jpeg, image/gif, image/jpg"
          {...register("image", {
            required: !posts,
          })}
        />

        {posts && (
          <div className="w-full mb-4">
            <img
              src={appWriteService.getFilePreview(posts.featuredImage)}
              className="rounded-lg"
              alt={posts.title}
            />
          </div>
        )}
        <Select
          label="Status: "
          options={["active", "inactive"]}
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />

        <Buttons
          className="w-full"
          type="submit"
          bgColor={posts ? "bg-green-500 " : undefined}
        >
          {posts ? "Update" : "Submit"}
        </Buttons>
      </div>
    </form>
  );
};

export default Postform;
