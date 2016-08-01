from rest_framework import permissions

class IsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        return request.user.username == obj.created_by
