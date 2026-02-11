from rest_framework.permissions import BasePermission


class HasRole(BasePermission):
    allowed_roles = set()

    def has_permission(self, request, view):
        profile = getattr(request.user, "profile", None)
        if not profile:
            return False
        return profile.role in self.allowed_roles


class IsAdmin(HasRole):
    allowed_roles = {"ADMIN"}


class IsEmployer(HasRole):
    allowed_roles = {"EMPLOYER"}


class IsJobSeeker(HasRole):
    allowed_roles = {"JOB_SEEKER"}
