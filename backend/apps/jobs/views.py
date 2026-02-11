from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Job
from .serializers import JobSerializer


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = Job.objects.all()
        location = self.request.query_params.get("location")
        job_type = self.request.query_params.get("job_type")
        skills = self.request.query_params.get("skills")
        if location:
            queryset = queryset.filter(location__icontains=location)
        if job_type:
            queryset = queryset.filter(job_type=job_type)
        if skills:
            queryset = queryset.filter(skills__icontains=skills)
        return queryset
