"use client"

import type React from "react"

import { useState } from "react"
import {
  Check,
  Search,
  Filter,
  ArrowUpDown,
  CheckSquare,
  Edit3,
  Users,
  Hammer,
  FileText,
  Share,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: string
  name: string
  icon: React.ReactNode
  assignee: {
    name: string
    avatar: string
    initials: string
  }
  dueDate?: string
  completed: boolean
}

const initialTasks: Task[] = [
  {
    id: "1",
    name: "Write project brief",
    icon: <Edit3 className="w-4 h-4 text-gray-600" />,
    assignee: {
      name: "Sohrab Amin",
      avatar: "/professional-man.png",
      initials: "SA",
    },
    dueDate: "November 30, 2022",
    completed: false,
  },
  {
    id: "2",
    name: "Schedule team off-site",
    icon: <Users className="w-4 h-4 text-blue-600" />,
    assignee: {
      name: "David Choi",
      avatar: "/asian-professional-man.png",
      initials: "DC",
    },
    completed: false,
  },
  {
    id: "3",
    name: "Build Admin console",
    icon: <Hammer className="w-4 h-4 text-gray-600" />,
    assignee: {
      name: "Tanner",
      avatar: "/developer-man.png",
      initials: "T",
    },
    dueDate: "November 8, 2022",
    completed: true,
  },
  {
    id: "4",
    name: "Draft launch blog post",
    icon: <FileText className="w-4 h-4 text-gray-600" />,
    assignee: {
      name: "Christina Lin",
      avatar: "/professional-woman-diverse.png",
      initials: "CL",
    },
    dueDate: "November 8, 2022",
    completed: false,
  },
  {
    id: "5",
    name: "Brainstorm on Share menu",
    icon: <Share className="w-4 h-4 text-gray-600" />,
    assignee: {
      name: "Jen Jackson",
      avatar: "/woman-designer.png",
      initials: "JJ",
    },
    dueDate: "November 8, 2022",
    completed: false,
  },
  {
    id: "6",
    name: "Come up with naming ideas",
    icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
    assignee: {
      name: "Jake Trower",
      avatar: "/creative-man.jpg",
      initials: "JT",
    },
    dueDate: "November 8, 2022",
    completed: false,
  },
]

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-900">To-dos</h1>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tasks Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Tasks</span>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <Filter className="w-4 h-4 mr-1" />
                  Filter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowUpDown className="w-4 h-4 mr-1" />
                  Sort
                </Button>
                <div className="relative">
                  {!isSearchExpanded ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsSearchExpanded(true)}
                      className="text-gray-600 hover:text-gray-900 p-2"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onBlur={() => {
                          if (!searchTerm) {
                            setIsSearchExpanded(false)
                          }
                        }}
                        className="pl-9 w-64 h-9"
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table Header */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="w-12 px-4 py-1 text-left border-r border-gray-300"></th>
                <th className="px-4 py-1 text-left border-r border-gray-300">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <span>Task name</span>
                  </div>
                </th>
                <th className="px-4 py-1 text-left border-r border-gray-300">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <Users className="w-3 h-3" />
                    <span>Assign</span>
                  </div>
                </th>
                <th className="px-4 py-1 text-left">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <span>Due</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
                >
                  {/* Checkbox */}
                  <td className="w-12 px-4 py-1 border-r border-gray-300">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 w-4 h-4"
                    />
                  </td>

                  {/* Task Name */}
                  <td className="px-4 py-1 border-r border-gray-300">
                    <div className="flex items-center gap-2">
                      {task.icon}
                      <span
                        className={`text-xs font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                      >
                        {task.name}
                      </span>
                    </div>
                  </td>

                  {/* Assignee */}
                  <td className="px-4 py-1 border-r border-gray-300">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                        <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-700 font-medium text-xs">{task.assignee.name}</span>
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="px-4 py-1">
                    {task.dueDate && <span className="text-gray-600 text-xs">{task.dueDate}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
