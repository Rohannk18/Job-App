from django.conf import settings
from django.db import models


class UserProfile(models.Model):
    ROLE_JOB_SEEKER = "JOB_SEEKER"
    ROLE_EMPLOYER = "EMPLOYER"
    ROLE_ADMIN = "ADMIN"
    ROLE_CHOICES = [
        (ROLE_JOB_SEEKER, "Job Seeker"),
        (ROLE_EMPLOYER, "Employer"),
        (ROLE_ADMIN, "Admin"),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=ROLE_JOB_SEEKER)
    phone = models.CharField(max_length=30, blank=True)
    location = models.CharField(max_length=120, blank=True)
    headline = models.CharField(max_length=160, blank=True)
    bio = models.TextField(blank=True)
    skills = models.TextField(blank=True)

    def __str__(self) -> str:
        return f"{self.user.username} ({self.role})"


class Resume(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="resumes")
    title = models.CharField(max_length=120)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.title}"


class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookmarks")
    job = models.ForeignKey("jobs.Job", on_delete=models.CASCADE, related_name="bookmarks")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "job")
