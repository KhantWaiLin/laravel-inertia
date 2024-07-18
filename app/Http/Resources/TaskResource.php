<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'assigned_user' => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'created_at' => (new Carbon($this->created_at))->format("Y-m-d"),
            'created_by' => new UserResource($this->createdBy),
            'description' => $this->description,
            'due_date' => (new Carbon($this->due_date))->format("Y-m-d"),
            'image_path' => $this->image_path,
            'name' => $this->name,
            'priority' => $this->priority,
            'project' => $this->project,
            'status' => $this->status,
        ];
    }
}
