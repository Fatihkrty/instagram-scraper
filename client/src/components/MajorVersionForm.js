import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  version: null,
  releaseDate: null,
};

const MajorVersionForm = ({ version, onSuccessForm }) => {
  const methods = useForm({ defaultValues });

  // State durumuna göre form içinde "_id" fieldi varsa update yoksa create işlemi gerçekleşir
  const isUpdate = methods.watch("_id");

  const onSubmit = async (data) => {
    if (isUpdate) {
      // update
      try {
        const response = await axios.put(
          `http://localhost:3001/versions/${isUpdate}`,
          data
        );
        onSuccessForm(response.data); // State güncellemek için üst komponent için kanca oluşturma
        methods.reset(defaultValues); // Güncelleme sonrası form verileri temizleme
      } catch (error) {
        console.log(error);
      }
    } else {
      // create
      try {
        const response = await axios.post(
          "http://localhost:3001/versions",
          data
        );
        onSuccessForm(response.data); // State güncellemek için üst komponent için kanca oluşturma
        methods.reset(defaultValues); // Ekleme sonrası form verileri temizleme
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (version) {
      methods.reset(version);
    } else {
      methods.reset(defaultValues);
    }
  }, [version, methods]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Major Version</h2>
        <button
          onClick={() => methods.reset(defaultValues)}
          className="addButton"
        >
          Temizle
        </button>
      </div>

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 10, gap: "10px", display: "flex" }}>
          <input
            required
            placeholder="Version"
            className="input-text"
            {...methods.register("version")}
          />

          <input
            required
            className="input-text"
            placeholder="Release Date"
            {...methods.register("releaseDate")}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "end" }}>
          <button type="submit" className="addButton">
            {isUpdate ? "Güncelle" : "Yeni Ekle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MajorVersionForm;
