// versionController.js

const { connectToDatabase, disconnectFromDatabase } = require("../db"); // Eksik olan bağlantı ve bağlantıyı kapatma fonksiyonlarını ekledik
const Apk = require("../models/apkModel.js");

const versionList = async (req, res) => {
  try {
    await connectToDatabase();

    const versions = await Apk.find({});
    res.json({ versions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectFromDatabase();
  }
};

const versionDetails = async (req, res) => {
  const { versionId } = req.params;

  try {
    await connectToDatabase();

    const version = await Apk.findById(versionId);

    if (version) {
      res.json(version);
    } else {
      res.status(404).json({ error: "Sürüm bulunamadı." });
    }
  } catch (error) {
    console.error(
      "MongoDB bağlantı hatası veya sürüm bulunamadı:",
      error.message
    );
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectFromDatabase();
  }
};

const createVersion = async (req, res) => {
  try {
    const data = req.body;

    if (!data.version || !data.releaseDate) {
      res.status(400).json({ error: "Geçersiz alanlar mevcut" });
      return;
    }

    await connectToDatabase();

    const apk = new Apk(data);
    const response = await apk.save();
    res.status(201).json(response);
  } catch (error) {
    console.log("Error saving APK:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectFromDatabase();
  }
};

const updateVersion = async (req, res) => {
  try {
    const data = req.body;
    const { versionId } = req.params;

    await connectToDatabase();

    const updatedVersion = await Apk.findOneAndUpdate(
      { _id: versionId },
      data,
      {
        new: true, // Update sonrası yeni datayı dönmek için gerekli
        upsert: false, // Id bulunamazsa yeni veri olarak eklemeyi iptal için gerekli
      }
    );

    if (updatedVersion) {
      res.status(200).json(updatedVersion);
    } else {
      res.status(404).json({ error: "Sürüm bulunamadı" });
    }
  } catch (error) {
    console.log("Error update APK:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectFromDatabase();
  }
};

const deleteVersion = async (req, res) => {
  const { versionId } = req.params;

  try {
    await connectToDatabase();

    const deletedVersion = await Apk.findByIdAndDelete(versionId);

    if (deletedVersion) {
      res.json({ message: "Sürüm başarıyla silindi." });
    } else {
      res.status(404).json({ error: "Sürüm bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectFromDatabase();
  }
};

module.exports = {
  versionList,
  createVersion,
  updateVersion,
  versionDetails,
  deleteVersion,
};
