import { defineStore } from "pinia";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
    tasks: {},
    loading: false,
    error: null
  }),
  actions: {
    async getProjects(userId) {
      try {
        this.loading = true;
        const q = query(collection(db, "projects"), where("ownerId", "==", userId));
        const snapshot = await getDocs(q);
        this.projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addProject(projectData) {
      try {
        await addDoc(collection(db, "projects"), projectData);
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateProject(projectId, updatedData) {
      const docRef = doc(db, "projects", projectId);
      await updateDoc(docRef, updatedData);
    },
    async deleteProject(projectId) {
      const docRef = doc(db, "projects", projectId);
      await deleteDoc(docRef);
    },
    // Pour les tâches
    async getTasks(projectId) {
      const tasksCol = collection(db, "projects", projectId, "tasks");
      onSnapshot(tasksCol, snapshot => {
        this.tasks[projectId] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });
    },
    async addTask(projectId, taskData) {
      await addDoc(collection(db, "projects", projectId, "tasks"), taskData);
    },
    async updateTask(projectId, taskId, updatedData) {
      const docRef = doc(db, "projects", projectId, "tasks", taskId);
      await updateDoc(docRef, updatedData);
    },
    async deleteTask(projectId, taskId) {
      const docRef = doc(db, "projects", projectId, "tasks", taskId);
      await deleteDoc(docRef);
    }
  }
});
